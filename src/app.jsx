import { LocationProvider, ErrorBoundary, Router, Route } from 'preact-iso';
import UsersRoute from './routes/users.jsx';
import EpicsRoute from './routes/epics.jsx';
import FeaturesRoute from './routes/features.jsx';
import StorysRoute from './routes/stories.jsx';
import './app.css';

export function App() {
  return (
    <LocationProvider scope="/">
      <ErrorBoundary>
          <Router>
              <Route path="/users" component={UsersRoute} />
              <Route path="/epics" component={EpicsRoute} />
              <Route default path="/stories" component={StorysRoute} />
              <Route path="/features" component={FeaturesRoute} />
          </Router>
      </ErrorBoundary>
    </LocationProvider>
  )
}
