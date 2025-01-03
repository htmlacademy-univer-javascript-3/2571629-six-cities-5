import { Router } from 'react-router-dom';
import type { BrowserHistory } from 'history';
import { useState, useLayoutEffect } from 'react';

export interface HistoryRouterProps {
  basename?: string;
  history: BrowserHistory;
  children?: React.ReactNode;
}

function HistoryRouter({ basename, children, history }: HistoryRouterProps): JSX.Element {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}

export default HistoryRouter;
