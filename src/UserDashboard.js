import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function UserDashboard() {

  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const querySnapshot = await getDocs(collection(db, "courses"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {/* 🔥 NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#111",
        color: "white"
      }}>
        <h2>🎓 E-Learn</h2>
      </div>

      {/* 🔥 BODY */}
      <div style={{ padding: "30px" }}>
        <h1>📚 Courses</h1>

        <input
          type="text"
          placeholder="🔍 Search course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            marginTop: "20px",
            width: "250px"
          }}
        />

        {/* 🔥 GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}>

          {filteredCourses.map((course) => (
            <div key={course.id} style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              background: "#1e293b",
              color: "white"
            }}>

              {/* THUMBNAIL */}
              <img
                src={course.thumbnail}
                alt="course thumbnail"
                width="100%"
                height="180"
              />

              <div style={{ padding: "10px" }}>
                <h3>{course.title}</h3>

                {/* 🎥 MULTI VIDEOS */}
                {course.videos && course.videos.map((vid, index) => (
                  <iframe
                    key={index}
                    src={vid}
                    title={`course-${course.id}-video-${index}`}
                    width="100%"
                    height="150"
                    style={{ marginBottom: "10px" }}
                    allowFullScreen
                  ></iframe>
                ))}

                {/* 📄 NOTES */}
                {course.notes && (
                  <a
                    href={course.notes}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      color: "#38bdf8"
                    }}
                  >
                    📄 View Notes
                  </a>
                )}

              </div>
            </div>
          ))}

        </div>

        {/* ❌ NO RESULT */}
        {filteredCourses.length === 0 && (
          <p style={{ marginTop: "20px" }}>No courses found 😢</p>
        )}

      </div>
    </div>
  );
}

export default UserDashboard;