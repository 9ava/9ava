"use strict";

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");
const { randomUUID } = require("crypto");

// ⚠️ 리전/테이블명은 환경변수로 관리 권장
const ddbClient = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-northeast-2",
});
const ddb = DynamoDBDocumentClient.from(ddbClient);
const USER_TABLE = process.env.USERS_TABLE;

const JSON_HEADERS = { "Content-Type": "application/json" };

exports.getUser = async (event) => {
  try {
    const id = event?.pathParameters?.id;
    if (!id) {
      return {
        statusCode: 400,
        headers: JSON_HEADERS,
        body: JSON.stringify({ message: "id is required in path" }),
      };
    }

    const result = await ddb.send(
      new GetCommand({
        TableName: USER_TABLE,
        Key: { id },
      })
    );

    if (!result.Item) {
      return {
        statusCode: 404,
        headers: JSON_HEADERS,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    // (선택) 쿼리스트링 예시
    const userType = event?.queryStringParameters?.userType ?? null;

    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({ user: result.Item, userType }),
    };
  } catch (err) {
    console.error("getUser error", err);
    return {
      statusCode: 500,
      headers: JSON_HEADERS,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

exports.createUser = async (event) => {
  try {
    const { name, email } = JSON.parse(event?.body ?? "{}");
    if (!name || !email) {
      return {
        statusCode: 400,
        headers: JSON_HEADERS,
        body: JSON.stringify({ message: "name and email are required" }),
      };
    }

    const id = randomUUID();
    const now = new Date().toISOString();
    const user = { id, name, email, createdAt: now };

    await ddb.send(
      new PutCommand({
        TableName: USER_TABLE,
        Item: user,
        // 동일 id 덮어쓰기 방지(선택)
        ConditionExpression: "attribute_not_exists(id)",
      })
    );

    return {
      statusCode: 201,
      headers: JSON_HEADERS,
      body: JSON.stringify({ message: "User created successfully", user }),
    };
  } catch (err) {
    console.error("createUser error", err);
    // 조건 실패 등은 400/409로 내려도 됩니다.
    return {
      statusCode: 400,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        message: "Invalid request",
        detail: String(err?.message || err),
      }),
    };
  }
};

exports.updateUser = async (event) => {
  try {
    const userId = event?.pathParameters?.id;
    if (!userId) {
      return {
        statusCode: 400,
        headers: JSON_HEADERS,
        body: JSON.stringify({ message: "id is required in path" }),
      };
    }

    const { name, email } = JSON.parse(event?.body ?? "{}");
    if (!name || !email) {
      return {
        statusCode: 400,
        headers: JSON_HEADERS,
        body: JSON.stringify({ message: "name and email are required" }),
      };
    }

    const now = new Date().toISOString();
    const result = await ddb.send(
      new UpdateCommand({
        TableName: USER_TABLE,
        Key: { id: userId },
        UpdateExpression:
          "SET #name = :name, #email = :email, #updatedAt = :now",
        ExpressionAttributeNames: {
          "#name": "name",
          "#email": "email",
          "#updatedAt": "updatedAt",
        },
        ExpressionAttributeValues: {
          ":name": name,
          ":email": email,
          ":now": now,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        message: `User ${userId} updated successfully`,
        user: result.Attributes,
      }),
    };
  } catch (err) {
    console.error("updateUser error", err);
    return {
      statusCode: 400,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        message: "Invalid request",
        detail: String(err?.message || err),
      }),
    };
  }
};

exports.deleteUser = async (event) => {
  try {
    const userId = event?.pathParameters?.id;
    if (!userId) {
      return {
        statusCode: 400,
        headers: JSON_HEADERS,
        body: JSON.stringify({ message: "id is required in path" }),
      };
    }

    const result = await ddb.send(
      new DeleteCommand({
        TableName: USER_TABLE,
        Key: { id: userId },
        ReturnValues: "ALL_OLD", // 삭제된 기존 아이템을 반환
      })
    );

    if (!result.Attributes) {
      return {
        statusCode: 404,
        headers: JSON_HEADERS,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({ message: `User ${userId} deleted successfully` }),
    };
  } catch (err) {
    console.error("deleteUser error", err);
    return {
      statusCode: 500,
      headers: JSON_HEADERS,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
