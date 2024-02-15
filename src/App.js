import { RoutesComponent } from 'components/RoutesComponent';
import './App.css';
import Header from 'components/Header';
import { Footer } from 'components/Footer';

function App() {
  return (
    <div className='flex flex-col w-screen h-screen  m-0 p-0'>
      <header className='w-full h-14'>
        <Header />
      </header>
      <main className='w-full'>
        <RoutesComponent />
      </main>
      <footer className='w-full h-3'>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
