export async function fetchNotifications() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM2hyMWEzMDAxQG10aWVhdC5vcmciLCJleHAiOjE3ODI1Mzk4MjIsImlhdCI6MTc4MjUzODkyMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjFmNjdjNTFiLWRlZDYtNDNkNC05YWVkLWFlOGU5MTQzOGJhNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImEgamFuYW5pIHByaXlhIiwic3ViIjoiZDBiN2VlZDAtZGU3MS00NDQyLTkxNmEtNzBiMWZlZmQ0OWNkIn0sImVtYWlsIjoiMjNocjFhMzAwMUBtdGllYXQub3JnIiwibmFtZSI6ImEgamFuYW5pIHByaXlhIiwicm9sbE5vIjoiMjNocjFhMzAwMSIsImFjY2Vzc0NvZGUiOiJhVGt5YnMiLCJjbGllbnRJRCI6ImQwYjdlZWQwLWRlNzEtNDQ0Mi05MTZhLTcwYjFmZWZkNDljZCIsImNsaWVudFNlY3JldCI6Ik1ldVRjTXNOQnF6UHp5dUEifQ.TXigmu7LBdFXdCXBt__xmmZaRMG6QABE1h1_7MQSJ30"
  const response = await fetch(
    "http://4.224.186.213/evaluation-service/notifications",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return (await response.json()).notifications;
}