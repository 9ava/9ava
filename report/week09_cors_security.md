# 9주차: CORS와 웹 보안

## 1. CORS (Cross-Origin Resource Sharing) 정책

CORS는 'Cross-Origin Resource Sharing'의 약자로, 추가적인 HTTP 헤더를 사용하여 한 출처(Origin)에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제입니다.

### Same-Origin Policy (동일 출처 정책)

기본적으로 웹 브라우저는 보안상의 이유로 동일 출처 정책(Same-Origin Policy, SOP)을 따릅니다. 이 정책은 스크립트가 자신이 로드된 출처와 다른 출처의 리소스와 상호 작용하는 것을 제한합니다. '출처(Origin)'는 프로토콜, 호스트(도메인), 포트 번호의 조합으로 결정됩니다.

예를 들어, `https://example.com:80`에서 로드된 스크립트는 `https://example.com:80/api/data`로는 요청을 보낼 수 있지만, `https://api.example.com`이나 `http://example.com`으로는 요청을 보낼 수 없습니다.

### CORS의 작동 원리

CORS는 이러한 동일 출처 정책에 대한 예외를 허용하는 메커니즘입니다. 서버는 특정 출처에서의 요청을 허용하기 위해 특정 HTTP 헤더를 응답에 포함시킬 수 있습니다.

- **`Access-Control-Allow-Origin`**: 이 헤더는 리소스에 접근할 수 있는 출처를 지정합니다. 예를 들어, `Access-Control-Allow-Origin: https://foo.example`는 `https://foo.example`에서 오는 요청만 허용합니다. 모든 출처를 허용하려면 `*`를 사용할 수 있지만, 보안상 권장되지 않습니다.

## 2. 웹 보안 기본 개념

### Origin (출처)

웹 콘텐츠의 '출처'는 URL의 **프로토콜(Scheme), 호스트(Host), 포트(Port)** 세 가지 요소의 조합으로 정의됩니다. 이 중 하나라도 다르면 다른 출처로 간주됩니다.

| URL                               | 결과   | 이유                               |
| --------------------------------- | ------ | ---------------------------------- |
| `http://store.company.com/dir/page.html` | -      | 기준 URL                           |
| `http://store.company.com/dir2/other.html` | 성공   | 경로만 다름                        |
| `https://store.company.com/dir/page.html` | 실패   | 프로토콜이 다름 (http vs https)    |
| `http://store.company.com:81/dir/page.html` | 실패   | 포트가 다름 (80 vs 81)             |
| `http://news.company.com/dir/page.html` | 실패   | 호스트가 다름 (store vs news)      |

### Header (헤더)

HTTP 헤더는 클라이언트와 서버가 요청 또는 응답으로 부가적인 정보를 전달할 수 있도록 해줍니다. CORS와 관련된 주요 헤더는 다음과 같습니다.

**요청 헤더:**

- **`Origin`**: 요청이 시작된 출처를 나타냅니다. `https://developer.mozilla.org`와 같은 값을 가집니다.
- **`Access-Control-Request-Method`**: Preflight 요청에서 실제 요청이 어떤 HTTP 메서드를 사용할 것인지를 서버에 알립니다.
- **`Access-Control-Request-Headers`**: Preflight 요청에서 실제 요청이 어떤 추가적인 헤더를 사용할 것인지를 서버에 알립니다.

**응답 헤더:**

- **`Access-Control-Allow-Origin`**: 리소스에 접근이 허용된 출처를 지정합니다.
- **`Access-Control-Allow-Methods`**: 리소스에 접근할 때 허용되는 HTTP 메서드를 지정합니다. (`GET`, `POST`, `PUT` 등)
- **`Access-Control-Allow-Headers`**: 실제 요청에서 사용할 수 있는 헤더를 지정합니다.
- **`Access-Control-Max-Age`**: Preflight 요청의 결과를 캐시할 수 있는 시간을 초 단위로 지정합니다.

## 3. Preflight Request (프리플라이트 요청)

'Preflight' 요청은 특정 종류의 CORS 요청 전에 브라우저가 자동으로 보내는 예비 요청입니다. 이 요청은 `OPTIONS` 메서드를 사용하여 실제 요청을 보내는 것이 안전한지 서버에 확인하는 역할을 합니다.

### Preflight 요청이 발생하는 경우

다음과 같은 경우에 Preflight 요청이 발생합니다.

1.  **`GET`**, **`HEAD`**, **`POST`** 이외의 메서드 (`PUT`, `DELETE`, `PATCH` 등)를 사용하는 경우
2.  `Accept`, `Accept-Language`, `Content-Language`, `Content-Type` (특정 값 제외) 이외의 헤더를 포함하는 경우
3.  `Content-Type` 헤더가 `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain` 이외의 값을 가지는 경우

### Preflight 요청의 흐름

1.  **브라우저 -> 서버 (Preflight 요청)**:
    -   메서드: `OPTIONS`
    -   헤더:
        -   `Origin`: 요청 출처
        -   `Access-Control-Request-Method`: 실제 요청의 메서드 (예: `PUT`)
        -   `Access-Control-Request-Headers`: 실제 요청에 포함될 헤더 (예: `X-Custom-Header`)

2.  **서버 -> 브라우저 (Preflight 응답)**:
    -   서버는 이 `OPTIONS` 요청을 받고, 해당 출처와 메서드, 헤더를 허용하는지 확인합니다.
    -   허용한다면, 다음과 같은 헤더를 포함하여 200 OK로 응답합니다.
        -   `Access-Control-Allow-Origin`: 요청을 허용한 출처
        -   `Access-Control-Allow-Methods`: 허용된 메서드 목록
        -   `Access-Control-Allow-Headers`: 허용된 헤더 목록
        -   `Access-Control-Max-Age`: 캐시 시간

3.  **브라우저 -> 서버 (실제 요청)**:
    -   브라우저는 Preflight 응답을 확인하고, 요청이 허용되었다면 실제 요청(예: `PUT` 요청)을 서버로 보냅니다.

만약 서버가 Preflight 요청에 대해 허용하지 않는 응답을 보내면, 브라우저는 실제 요청을 보내지 않고 CORS 오류를 발생시킵니다.
