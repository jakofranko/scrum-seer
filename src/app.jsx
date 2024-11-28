import { LocationProvider, ErrorBoundary, Router, Route } from 'preact-iso';
import Nav from "./components/Nav.jsx";
import UsersRoute from './routes/users.jsx';
import EpicsRoute from './routes/epics.jsx';
import FeaturesRoute from './routes/features.jsx';
import StoriesRoute from './routes/stories.jsx';
import HomeRoute from './routes/home.jsx';
import './app.css';

export function App() {
  return (
    <LocationProvider scope="/">
      <ErrorBoundary>
          <header>Scrum Seer</header>
          <Nav />
          <main>
              <Router>
                  <Route default path="/" component={HomeRoute} />
                  <Route path="/users" component={UsersRoute} />
                  <Route path="/epics" component={EpicsRoute} />
                  <Route path="/stories" component={StoriesRoute} />
                  <Route path="/features" component={FeaturesRoute} />
              </Router>
          </main>
      </ErrorBoundary>
    </LocationProvider>
  )
}
