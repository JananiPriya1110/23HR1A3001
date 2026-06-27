import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API =
  "http://20.244.56.144/evaluation-service/notifications";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM2hyMWEzMDAxQG10aWVhdC5vcmciLCJleHAiOjE3ODI1Mzk4MjIsImlhdCI6MTc4MjUzODkyMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjFmNjdjNTFiLWRlZDYtNDNkNC05YWVkLWFlOGU5MTQzOGJhNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImEgamFuYW5pIHByaXlhIiwic3ViIjoiZDBiN2VlZDAtZGU3MS00NDQyLTkxNmEtNzBiMWZlZmQ0OWNkIn0sImVtYWlsIjoiMjNocjFhMzAwMUBtdGllYXQub3JnIiwibmFtZSI6ImEgamFuYW5pIHByaXlhIiwicm9sbE5vIjoiMjNocjFhMzAwMSIsImFjY2Vzc0NvZGUiOiJhVGt5YnMiLCJjbGllbnRJRCI6ImQwYjdlZWQwLWRlNzEtNDQ0Mi05MTZhLTcwYjFmZWZkNDljZCIsImNsaWVudFNlY3JldCI6Ik1ldVRjTXNOQnF6UHp5dUEifQ.TXigmu7LBdFXdCXBt__xmmZaRMG6QABE1h1_7MQSJ30";

const priorityWeights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function App() {
  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [topN, setTopN] =
    useState(10);

  const [search, setSearch] =
    useState("");

  const sortNotifications = (
    data
  ) => {
    return [...data]
      .sort((a, b) => {
        const priorityDiff =
          priorityWeights[b.Type] -
          priorityWeights[a.Type];

        if (priorityDiff !== 0) {
          return priorityDiff;
        }

        return (
          new Date(
            b.Timestamp
          ).getTime() -
          new Date(
            a.Timestamp
          ).getTime()
        );
      })
      .slice(0, topN);
  };

  const fetchNotifications =
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await axios.get(API, {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            timeout: 5000,
          });

        const data =
          response.data.notifications ||
          [];

        const sorted =
          sortNotifications(data);

        setNotifications(sorted);
      } catch (err) {
        console.log(err);

        // fallback mock data
        const mockData = [
          {
            ID: "1",
            Type: "Placement",
            Message:
              "Amazon hiring for SDE Intern",
            Timestamp:
              "2026-06-27 10:30:00",
          },
          {
            ID: "2",
            Type: "Result",
            Message:
              "Mid exam results published",
            Timestamp:
              "2026-06-27 09:00:00",
          },
          {
            ID: "3",
            Type: "Event",
            Message:
              "Hackathon starts tomorrow",
            Timestamp:
              "2026-06-27 08:00:00",
          },
          {
            ID: "4",
            Type: "Placement",
            Message:
              "Microsoft campus drive announced",
            Timestamp:
              "2026-06-27 11:00:00",
          },
        ];

        const sorted =
          sortNotifications(mockData);

        setNotifications(sorted);

        setError(
          "API not responding. Showing demo data."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () =>
      clearInterval(interval);
  }, [topN]);

  const filteredNotifications =
    notifications.filter((item) =>
      item.Message.toLowerCase().includes(
        search.toLowerCase()
      )
    );

  return (
    <div className="container">
      <div className="header">
        <h1>Priority Inbox</h1>

        <button
          className="refreshBtn"
          onClick={fetchNotifications}
        >
          Refresh
        </button>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={topN}
          onChange={(e) =>
            setTopN(
              Number(e.target.value)
            )
          }
        >
          <option value={5}>
            Top 5
          </option>

          <option value={10}>
            Top 10
          </option>

          <option value={20}>
            Top 20
          </option>
        </select>
      </div>

      <p className="count">
        Total Notifications:
        {filteredNotifications.length}
      </p>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {loading ? (
        <p className="loading">
          Loading notifications...
        </p>
      ) : filteredNotifications.length ===
        0 ? (
        <p className="empty">
          No notifications found
        </p>
      ) : (
        filteredNotifications.map((item) => (
          <div
            key={item.ID}
            className="card"
          >
            <div className="cardHeader">
              <span
                className={`badge ${item.Type}`}
              >
                {item.Type}
              </span>

              <small>
                {new Date(
                  item.Timestamp
                ).toLocaleString()}
              </small>
            </div>

            <p>{item.Message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
