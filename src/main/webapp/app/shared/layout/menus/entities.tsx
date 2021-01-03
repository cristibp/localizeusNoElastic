import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/project">
      <Translate contentKey="global.menu.entities.project" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/translation-key">
      <Translate contentKey="global.menu.entities.translationKey" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/translation">
      <Translate contentKey="global.menu.entities.translation" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/language">
      <Translate contentKey="global.menu.entities.language" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/comment">
      <Translate contentKey="global.menu.entities.comment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/discussion">
      <Translate contentKey="global.menu.entities.discussion" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/project-history">
      <Translate contentKey="global.menu.entities.projectHistory" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/api-key">
      <Translate contentKey="global.menu.entities.apiKey" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/key-label">
      <Translate contentKey="global.menu.entities.keyLabel" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-permission">
      <Translate contentKey="global.menu.entities.userPermission" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/company">
      <Translate contentKey="global.menu.entities.company" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/transaction">
      <Translate contentKey="global.menu.entities.transaction" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/plan">
      <Translate contentKey="global.menu.entities.plan" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/service-subscription">
      <Translate contentKey="global.menu.entities.serviceSubscription" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/user-project-permission">
      <Translate contentKey="global.menu.entities.userProjectPermission" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
