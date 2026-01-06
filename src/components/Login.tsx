import { useState, useEffect } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  // Responsive helper functions
  const getLoginBoxWidth = () => {
    if (screenWidth < 480) return "85vw";
    if (screenWidth < 768) return "90vw";
    if (screenWidth < 1024) return "350px";
    return "400px";
  };

  const getLoginBoxPadding = () => {
    if (screenWidth < 480) return "25px";
    if (screenWidth < 768) return "30px";
    return "40px";
  };

  const getHeadingSize = () => {
    if (screenWidth < 480) return "18px";
    if (screenWidth < 768) return "22px";
    if (screenWidth < 1024) return "25px";
    return "28px";
  };

  const getQuoteFontSize = () => {
    if (screenWidth < 1024) return "28px";
    if (screenWidth < 1200) return "32px";
    if (screenWidth < 1440) return "40px";
    if (screenWidth < 1600) return "44px";
    return "48px";
  };

  const getQuoteMaxWidth = () => {
    if (screenWidth < 1200) return "500px";
    return "700px";
  };

  const getPaddingLeft = () => {
    if (screenWidth < 1024) return "50px";
    if (screenWidth < 1440) return "120px";
    return "200px";
  };

  const showQuote = screenWidth > 1024;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: screenWidth < 1024 ? "column" : "row",
        alignItems: "center",
        justifyContent: screenWidth < 1024 ? "center" : "flex-start",
        paddingLeft: screenWidth < 1024 ? "0" : getPaddingLeft(),
        paddingTop: screenWidth < 1024 ? "20px" : "0",
        paddingBottom: screenWidth < 1024 ? "20px" : "0",
        overflow: "hidden",
      }}
    >
      {/* Translucent Rectangle */}
      <div
        style={{
          width: getLoginBoxWidth(),
          maxWidth: "500px",
          padding: getLoginBoxPadding(),
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          marginBottom: screenWidth < 1024 ? "30px" : "0",
        }}
      >
        {/* Heading */}
        <h1
          style={{
            fontSize: getHeadingSize(),
            fontWeight: "bold",
            color: "white",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          Login to your account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Section */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "white",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "8px",
                color: "white",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          {/* Password Section */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "white",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "8px",
                color: "white",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          {/* Forgot Password Link */}
          <div style={{ marginBottom: "20px", textAlign: "right" }}>
            <a
              href="#"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: "14px",
                textDecoration: "none",
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.9)";
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* Remember Me Checkbox */}
          <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{
                marginRight: "8px",
                cursor: "pointer",
              }}
            />
            <label
              htmlFor="rememberMe"
              style={{
                color: "white",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "15px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3b82f6";
            }}
          >
            Login
          </button>

          {/* Registration Option */}
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "14px" }}>
              New user?{' '}
              <a
                href="#"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "text-decoration 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                Register here
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Quote on the Right Side */}
      {showQuote && (
        <div
          style={{
            position: "absolute",
            right: `calc(${getPaddingLeft()} - 50px)`,
            top: "50%",
            transform: "translateY(-50%)",
            maxWidth: getQuoteMaxWidth(),
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: getQuoteFontSize(),
              fontWeight: "500",
              color: "white",
              fontFamily: "'Poppins', sans-serif",
              lineHeight: "1.8",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              wordWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            "HAPPINESS IS A WAY OF TRAVEL, NOT A DESTINATION."
          </p>
        </div>
      )}
    </div>
  );
}
