import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import GraphWrapper from '../components/pages/DataVisualizations/GraphWrapper';

// Mock of Graph components
jest.mock('../components/pages/DataVisualizations/Graphs/CitizenshipMapAll', () => () => <div>CitizenshipMapAll</div>);
jest.mock('../components/pages/DataVisualizations/Graphs/CitizenshipMapSingleOffice', () => () => <div>CitizenshipMapSingleOffice</div>);
jest.mock('../components/pages/DataVisualizations/Graphs/TimeSeriesAll', () => () => <div>TimeSeriesAll</div>);
jest.mock('../components/pages/DataVisualizations/Graphs/OfficeHeatMap', () => () => <div>OfficeHeatMap</div>);
jest.mock('../components/pages/DataVisualizations/Graphs/TimeSeriesSingleOffice', () => () => <div>TimeSeriesSingleOffice</div>);
jest.mock('../components/pages/DataVisualizations/YearLimitsSelect', () => () => <div>YearLimitsSelect</div>);
jest.mock('../components/pages/DataVisualizations/ViewSelect', () => () => <div>ViewSelect</div>);
jest.mock('../utils/scrollToTopOnMount', () => () => <div>ScrollToTopOnMount</div>);

const mockStore = configureStore([]);

describe('GraphWrapper', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <GraphWrapper set_view={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('ScrollToTopOnMount')).toBeInTheDocument();
  });

  it('sets default view if none is provided', () => {
    const set_view = jest.fn();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <GraphWrapper set_view={set_view} />
        </BrowserRouter>
      </Provider>
    );
    expect(set_view).toHaveBeenCalledWith('time-series');
  });

  it('renders the correct map based on the view and office', () => {
    const { rerender } = render(
      <Provider store={store}>
        <BrowserRouter>
          <GraphWrapper set_view={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('TimeSeriesAll')).toBeInTheDocument();

    rerender(
      <Provider store={store}>
        <BrowserRouter>
          <GraphWrapper set_view={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );

  });
});
