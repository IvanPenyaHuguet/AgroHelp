import { Router, Route, Switch } from 'wouter'

import Index from './pages/Index'
import useHashLocation from './hooks/useHashLocation'

export default function RouterPaths() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Index} />
      </Switch>
    </Router>
  )
}
