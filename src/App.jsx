// App.jsx
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentPage, setCurrentPage] = useState("list");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [joinedEvents, setJoinedEvents] = useState({});

  const events = [
    {
      id: 1,
      name: "地域祭り",
      date: "2025年5月1日 10時～15時",
      place: "中央公園",
      description: "地域の方々が集まり屋台や催しを楽しめるイベントです",
      participants: 10,
    },
    {
      id: 2,
      name: "清掃活動",
      date: "2025年5月10日 9時～11時",
      place: "駅前",
      description: "地域の環境美化を目的とした清掃イベントです",
      participants: 5,
    },
    {
      id: 3,
      name: "交流会",
      date: "2025年5月20日 18時～20時",
      place: "市民センター",
      description: "世代を超えて交流できるイベントです",
      participants: 8,
    },
  ];

  const participantsData = {
    1: [
      { id: 1, name: "山田太郎", age: 25, gender: "男性" },
      { id: 2, name: "鈴木花子", age: 30, gender: "女性" },
    ],
    2: [
      { id: 1, name: "佐藤一郎", age: 40, gender: "男性" },
      { id: 2, name: "田中美咲", age: 22, gender: "女性" },
    ],
    3: [{ id: 1, name: "高橋健", age: 35, gender: "男性" }],
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert("メールアドレスとパスワードを入力してください");
      return;
    }
    if (!email.includes("@")) {
      alert("正しいメールアドレスを入力してください");
      return;
    }
    setIsLoggedIn(true);
  };

  const handleJoinToggle = (event) => {
    const isJoined = joinedEvents[event.id];
    const confirmMsg = isJoined
      ? "参加をキャンセルしますか？"
      : "イベントに参加しますか？";

    if (window.confirm(confirmMsg)) {
      setJoinedEvents((prev) => ({
        ...prev,
        [event.id]: !isJoined,
      }));
    }
  };

  return (
    <div style={styles.container}>
      {!isLoggedIn ? (
        // ログイン画面だけ専用スタイル
        <div style={styles.loginCard}>
          <h2>{isLogin ? "ログイン" : "会員登録"}</h2>
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleLogin} style={styles.button}>
            {isLogin ? "ログイン" : "登録"}
          </button>
          <p style={styles.link} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "会員登録はこちら" : "ログインはこちら"}
          </p>
        </div>
      ) : (
        <>
          {/* イベント一覧 */}
          {currentPage === "list" && (
            <div style={styles.listContainer}>
              <h2>イベント一覧</h2>
              {events.map((event) => (
                <div key={event.id} style={styles.card}>
                  <p style={styles.eventName}>{event.name}</p>

                  <div style={styles.buttonGroup}>
                    <button
                      style={styles.actionButton}
                      onClick={() => {
                        setSelectedEvent(event);
                        setCurrentPage("detail");
                      }}
                    >
                      詳細
                    </button>

                    <button
                      style={{
                        ...styles.actionButton,
                        backgroundColor: joinedEvents[event.id]
                          ? "red"
                          : "#007bff",
                      }}
                      onClick={() => handleJoinToggle(event)}
                    >
                      {joinedEvents[event.id] ? "参加キャンセル" : "参加"}
                    </button>

                    <button
                      style={styles.actionButton}
                      onClick={() => {
                        setSelectedEvent(event);
                        setCurrentPage("participants");
                      }}
                    >
                      参加者一覧
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* イベント詳細 */}
          {currentPage === "detail" && selectedEvent && (
            <div style={styles.card}>
              <h2>イベント詳細</h2>
              <div style={styles.detailContainer}>
                <p>イベント名：{selectedEvent.name}</p>
                <p>日時：{selectedEvent.date}</p>
                <p>場所：{selectedEvent.place}</p>
                <p style={styles.description}>
                  説明：{selectedEvent.description}
                </p>
                <p>参加人数：{selectedEvent.participants}人</p>
              </div>
              <button
                style={styles.button}
                onClick={() => setCurrentPage("list")}
              >
                一覧に戻る
              </button>
            </div>
          )}

          {/* 参加者一覧 */}
          {currentPage === "participants" && selectedEvent && (
            <div style={styles.card}>
              <h2>{selectedEvent.name} - 参加者一覧</h2>
              <div style={styles.participantsContainer}>
                {participantsData[selectedEvent.id].map((p) => (
                  <p key={p.id}>
                    名前：{p.name} / 年齢：{p.age} / 性別：{p.gender}
                  </p>
                ))}
              </div>
              <button
                style={styles.button}
                onClick={() => setCurrentPage("list")}
              >
                一覧に戻る
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // ←中央配置（ログイン用）
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },

  // ログイン専用
  loginCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "350px",
  },

  listContainer: {
    width: "100%",
    maxWidth: "500px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    width: "100%",
    boxSizing: "border-box",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },

  button: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  link: {
    marginTop: "10px",
    color: "blue",
    cursor: "pointer",
  },

  detailContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    gap: "10px",
    marginTop: "10px",
  },

  description: {
    whiteSpace: "normal",
    wordBreak: "break-word",
    lineHeight: "1.5",
  },

  participantsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    textAlign: "left",
    marginTop: "10px",
  },

  eventName: {
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "left",
  },

  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  actionButton: {
    flex: "1 1 100%", // スマホ縦並び
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default App;