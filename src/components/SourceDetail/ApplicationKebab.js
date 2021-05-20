import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { KebabToggle, Dropdown, DropdownItem } from '@patternfly/react-core';

import { replaceRouteId, routes } from '../../Routes';
import { useHasWritePermissions } from '../../hooks/useHasWritePermissions';

const ApplicationKebab = ({ app, removeApp, addApp }) => {
  const [isOpen, setOpen] = useState(false);
  const intl = useIntl();
  const hasRightAccess = useHasWritePermissions();

  const wrappedFunction = (func) => () => {
    setOpen(false);
    func();
  };

  const tooltip = intl.formatMessage({
    id: 'sources.notAdminButton',
    defaultMessage: 'To perform this action, you must be granted write permissions from your Organization Administrator.',
  });

  const disabledProps = {
    tooltip,
    isDisabled: true,
    className: 'ins-c-sources__disabled-drodpown-item',
  };

  const pausedButton = app.paused_at ? (
    <DropdownItem
      {...(!hasRightAccess && disabledProps)}
      key="resume"
      description={intl.formatMessage({
        id: 'app.kebab.resume.title',
        defaultMessage: 'Resume data collection for this application.',
      })}
      onClick={wrappedFunction(addApp)}
    >
      {intl.formatMessage({
        id: 'app.kebab.resume.button',
        defaultMessage: 'Resume',
      })}
    </DropdownItem>
  ) : (
    <DropdownItem
      {...(!hasRightAccess && disabledProps)}
      key="pause"
      on
      description={intl.formatMessage({
        id: 'app.kebab.pause.title',
        defaultMessage: 'Temporarily stop this application from collecting data.',
      })}
      onClick={wrappedFunction(removeApp)}
    >
      {intl.formatMessage({
        id: 'app.kebab.pause.button',
        defaultMessage: 'Pause',
      })}
    </DropdownItem>
  );
  const removedButton = (
    <DropdownItem
      {...(!hasRightAccess && disabledProps)}
      key="remove"
      description={intl.formatMessage({
        id: 'app.kebab.remove.title',
        defaultMessage: 'Permanently stop data collection for this application.',
      })}
    >
      {intl.formatMessage({
        id: 'app.kebab.pause.button',
        defaultMessage: 'Remove',
      })}
    </DropdownItem>
  );

  return (
    <Dropdown
      isPlain
      isOpen={isOpen}
      position="right"
      dropdownItems={[pausedButton, removedButton]}
      className="ins-c-sources__application_kebab"
      toggle={<KebabToggle onToggle={() => setOpen((open) => !open)} />}
    />
  );
};

ApplicationKebab.propTypes = {
  app: PropTypes.shape({
    id: PropTypes.string,
    paused_at: PropTypes.string,
  }).isRequired,
  removeApp: PropTypes.func,
  addApp: PropTypes.func,
};

export default ApplicationKebab;
