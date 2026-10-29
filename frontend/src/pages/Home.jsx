import { useEffect, useState } from "react";

function Home({ setActivePage }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <div>
        <p>Beat the rush, own your time.</p>
        <h1>{now.toLocaleTimeString("fr-CH", { hour: "2-digit", minute: "2-digit" })}</h1>
        <button onClick={() => setActivePage('Focus')}>Rush</button>
      </div>
    </main>
  );
}

export default Home;