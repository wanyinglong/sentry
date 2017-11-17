import React from 'react';
import {shallow} from 'enzyme';

import {Client} from 'app/api';
import OrganizationRepositories from 'app/views/settings/organization/repositories/organizationRepositories';

describe('OrganizationRepositories', function() {
  it('renders without providers', function() {
    let wrapper = shallow(
      <OrganizationRepositories
        params={{orgId: 'org-slug'}}
        itemList={[]}
        repoConfig={{}}
      />
    );
    // wrapper.find('.dropdown-actor').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with github provider', function() {
    let wrapper = shallow(
      <OrganizationRepositories
        params={{orgId: 'org-slug'}}
        repoConfig={{providers: [TestStubs.GitHubRepositoryProvider()]}}
        itemList={[]}
      />
    );
    // wrapper.find('.dropdown-actor').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with a repository', function() {
    Client.addMockResponse({
      url: '/organizations/org-slug/repos/',
      body: [TestStubs.Repository()],
    });
    let wrapper = shallow(
      <OrganizationRepositories
        params={{orgId: 'org-slug'}}
        repoConfig={{providers: [TestStubs.GitHubRepositoryProvider()]}}
        itemList={[TestStubs.Repository()]}
      />
    );
    // wrapper.find('.dropdown-actor').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
