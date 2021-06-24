import styles from './App.module.css';

import PhotoSettings from './components/PhotoSettings/PhotoSettings'
import MainPhoto from './components/MainPhoto/MainPhoto'
import Filters from './components/Filters/Filters'
import Gallery from './components/Gallery/Gallery';

import background from './assets/sky1.jpg'

function App() {
  return (
   <div className={styles.App} style={{ backgroundImage: `url(${background})`}}>
   {/* <div className={styles.App}> */}
      <div className={styles.container}>
        <PhotoSettings />
        <MainPhoto />
        <Filters />
      </div>
      <br/>
      <Gallery/>
    </div>
  );
}

export default App;
