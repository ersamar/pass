import { PassCard } from "./PassCard";
import { Helmet } from 'react-helmet';

function App() {
  return <div>
    <Helmet>
    <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Playwrite+US+Modern:wght@100..400&family=Ubuntu+Sans+Mono:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
    </Helmet>
    <PassCard/>
  </div>
}

export default App;
