import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

import { Alert } from '@patternfly/react-core';

const EditAlert = ({ name }) => {
  const formOptions = useFormApi();

  const { variant, title, description, customIcon } = get(formOptions.getState().values, name);

  return (
    <Alert variant={variant} isInline title={title} customIcon={customIcon}>
      {description}
    </Alert>
  );
};

EditAlert.propTypes = {
  name: PropTypes.string.isRequired,
};

export default EditAlert;
