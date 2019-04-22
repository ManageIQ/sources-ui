import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { notificationsMiddleware } from '@red-hat-insights/insights-frontend-components/components/Notifications';

import SourcesPage from '../pages/SourcesPage';
import SourcesEmptyState from '../components/SourcesEmptyState';
import SourcesFilter from '../components/SourcesFilter';
import SourcesSimpleView from '../components/SourcesSimpleView';

import configureStore from 'redux-mock-store';
import { sourcesData } from './sourcesData';
import { sourceTypesData } from './sourceTypesData';

import { MemoryRouter } from 'react-router-dom';
import { SOURCES_API_BASE } from '../Utilities/Constants';

describe('SourcesPage', () => {
    const middlewares = [thunk, notificationsMiddleware()];
    let mockStore;
    let initialProps;
    let initialState;

    beforeEach(() => {
        initialProps = {};
        mockStore = configureStore(middlewares);
        initialState = { providers: { loaded: true, rows: [], entities: [], numberOfEntities: 0 } };
    });

    const ComponentWrapper = ({ store, children }) => (
        <Provider store={ store }>
            <MemoryRouter>
                { children }
            </MemoryRouter>
        </Provider>
    );

    it('should fetch sources and source types on component mount', (done) => {
        expect.assertions(1);
        const store = mockStore(initialState);
        fetchMock.getOnce(`${SOURCES_API_BASE}/sources/`, { data: {} });
        fetchMock.getOnce(`${SOURCES_API_BASE}/source_types/`, { data: {} });

        const expectedActions = [
            { type: 'LOAD_SOURCE_TYPES_PENDING' },
            { type: 'LOAD_ENTITIES_PENDING' },
            expect.objectContaining({ type: 'LOAD_ENTITIES_FULFILLED' }),
            expect.objectContaining({ type: 'LOAD_SOURCE_TYPES_FULFILLED' })
        ];

        mount(<ComponentWrapper store={ store }><SourcesPage { ...initialProps } /></ComponentWrapper>);
        setImmediate(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('renders empty state when there are no Sources', (done) => {
        const store = mockStore(initialState);
        fetchMock.getOnce(`${SOURCES_API_BASE}/sources/`, sourcesData);
        fetchMock.getOnce(`${SOURCES_API_BASE}/source_types/`, sourceTypesData);

        const page = mount(<ComponentWrapper store={ store }><SourcesPage { ...initialProps } /></ComponentWrapper>);
        setImmediate(() => {
            expect(page.find(SourcesEmptyState)).toHaveLength(1);
            done();
        });
    });

    it('renders table and filtering', (done) => {
        const store = mockStore({
            providers: { loaded: true, rows: [], entities: [], numberOfEntities: 1 }
        });
        fetchMock.getOnce(`${SOURCES_API_BASE}/sources/`, sourcesData);
        fetchMock.getOnce(`${SOURCES_API_BASE}/source_types/`, sourceTypesData);

        const page = mount(<ComponentWrapper store={ store }><SourcesPage { ...initialProps } /></ComponentWrapper>);

        setImmediate(() => {
            expect(page.find(SourcesFilter)).toHaveLength(1);
            expect(page.find(SourcesSimpleView)).toHaveLength(1);
            done();
        });
    });

    afterEach(() => {
        fetchMock.reset();
    });
});
