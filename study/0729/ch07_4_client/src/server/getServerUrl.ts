export const getServerUrl = (path: string) => {
  const host = 'http://10.10.0.156:4000'
  // 'http://PC아이피:4000' - 바뀔때는 여기 수정해야함 (모바일 접속용 테스트 안할거면 localhost:4000 해도 됨)
  return [host, path].join('')
}
