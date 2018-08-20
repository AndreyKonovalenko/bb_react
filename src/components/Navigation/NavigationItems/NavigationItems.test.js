import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper; 
    beforeEach(() => {
         wrapper = shallow(<NavigationItems />);
    });
    
    it('should render two <NavigationItem /> element if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
        //expect method provided by Jest package
    });
    
    it('should render three <NavigationItem /> element if not authenticated', () => {
        //wrapper = shallow(<NavigationItems isAuthenticated />); one way
        wrapper.setProps({isAuthenticated: true});
        // second way by using setProsp method form the enzyme package
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    
});