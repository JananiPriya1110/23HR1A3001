const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

export async function Log(stack, level, packageName, message) {
  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Logging failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Logger Error:", error.message);
  }
}