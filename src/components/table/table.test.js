import React from 'react';
import {create} from 'react-test-renderer';
import Tables from "./table";

describe('Table component', () => {
  test('it show correct props', () => {
    let component = create(<Tables items={[]} Container={<div></div>} type={'test'}/>);
    let instance = component.getInstance();

    // console.log(instance);

    expect(instance.props.type).toBe('test');
  });
});
