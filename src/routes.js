import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';

const routerConfig = [
    {
        path: '/page1',
        component: Page1,
        auth: true,
    }, {
        path: '/page2',
        component: Page2,
        auth: true,
    }, {
        path: '/page3',
        component: Page3,
    }, {
        path: '/page4',
        component: Page4
    }
];

export default routerConfig