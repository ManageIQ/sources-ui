import React from 'react';
import { useIntl } from 'react-intl';

import {
  Text,
  TextVariants,
  TextContent,
  TextList,
  TextListVariants,
  TextListItem,
  TextListItemVariants,
  ClipboardCopy,
} from '@patternfly/react-core';

import { HCCM_DOCS_PREFIX } from '../../stringConstants';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';

const CREATE_AZURE_STORAGE = `${HCCM_DOCS_PREFIX}/html-single/adding_a_microsoft_azure_source_to_cost_management/index#creating-an-azure-storage-account_adding-an-azure-source`;
const AZURE_CREDS_URL = `${HCCM_DOCS_PREFIX}/html-single/adding_a_microsoft_azure_source_to_cost_management/index#configuring-azure-roles_adding-an-azure-source`;
const RECURRING_TASK_URL = `${HCCM_DOCS_PREFIX}/html-single/adding_a_microsoft_azure_source_to_cost_management/index#configuring-an-azure-daily-export-schedule_adding-an-azure-source`;

export const ConfigureResourceGroupAndStorageAccount = () => {
  const intl = useIntl();

  return (
    <TextContent>
      <Text component={TextVariants.p}>
        {intl.formatMessage(
          {
            id: 'cost.azure.storageAccountDescription',
            defaultMessage:
              'Red Hat recommends creating a dedicated resource group and storage account in Azure to collect cost data and metrics for cost management. {link}',
          },
          {
            link: (
              <Text key="link" rel="noopener noreferrer" target="_blank" component={TextVariants.a} href={CREATE_AZURE_STORAGE}>
                {intl.formatMessage({
                  id: 'wizard.learnMore defaultMessage=Learn more',
                  defaultMessage: 'Learn more',
                })}
              </Text>
            ),
          }
        )}
      </Text>
      <Text component={TextVariants.p}>
        {intl.formatMessage({
          id: 'cost.azure.storageAccountAfterDescription',
          defaultMessage: 'After configuring a resource group and storage account in the Azure portal, enter the following:',
        })}
      </Text>
    </TextContent>
  );
};

export const SubscriptionID = () => {
  const intl = useIntl();

  return (
    <TextContent>
      <Text component={TextVariants.p}>
        {intl.formatMessage({
          id: 'cost.azure.subscriptionIdCommand',
          defaultMessage: 'Run the following command in Cloud Shell to obtain your Subscription ID and enter it below:',
        })}
      </Text>
      <ClipboardCopy>{`az account show --query "{ subscription_id: id }"`}</ClipboardCopy>
    </TextContent>
  );
};

export const ConfigureRolesDescription = () => {
  const intl = useIntl();

  return (
    <TextContent>
      <Text component={TextVariants.p}>
        {intl.formatMessage(
          {
            id: 'cost.azure.dedicatedCredentials',
            defaultMessage:
              'Red Hat recommends configuring dedicated credentials to grant Cost Management read-only access to Azure cost data.  {link}',
          },
          {
            link: (
              <Text key="link" rel="noopener noreferrer" target="_blank" component={TextVariants.a} href={AZURE_CREDS_URL}>
                {intl.formatMessage({
                  id: 'wizard.learnMore defaultMessage=Learn more',
                  defaultMessage: 'Learn more',
                })}
              </Text>
            ),
          }
        )}
      </Text>
      <Text component={TextVariants.p}>
        {intl.formatMessage({
          id: 'cost.azure.createContributorRole',
          defaultMessage:
            'Run the following command in Cloud Shell to create a Cost Management Storage Account Contributor role. From the output enter the values in the fields below:',
        })}
      </Text>
      <ClipboardCopy>{`az ad sp create-for-rbac -n "CostManagement" --role "Storage Account Contributor" --query '{"tenant": tenant, "client_id": appId, "secret": password}'`}</ClipboardCopy>
    </TextContent>
  );
};

export const ReaderRoleDescription = () => {
  const form = useFormApi();
  const {
    values: { application },
  } = form.getState();
  const intl = useIntl();

  return (
    <TextContent>
      <Text component={TextVariants.p}>
        {intl.formatMessage({
          id: 'cost.azure.createReaderRole',
          defaultMessage: 'Run the following command in Cloud Shell to create a Cost Management Reader role:',
        })}
      </Text>
      <ClipboardCopy>{`az role assignment create --role "Cost Management Reader" --assignee http://CostManagement --subscription ${application.extra.subscription_id}`}</ClipboardCopy>
    </TextContent>
  );
};

export const ExportSchedule = () => {
  const intl = useIntl();

  return (
    <TextContent>
      <Text component={TextVariants.p}>
        {intl.formatMessage(
          {
            id: 'cost.azure.storageAccountDescription',
            defaultMessage:
              'Create a recurring task to export cost data to your Azure storage account, where Cost Management will retrieve the data.  {link}',
          },
          {
            link: (
              <Text key="link" rel="noopener noreferrer" target="_blank" component={TextVariants.a} href={RECURRING_TASK_URL}>
                {intl.formatMessage({
                  id: 'wizard.learnMore defaultMessage=Learn more',
                  defaultMessage: 'Learn more',
                })}
              </Text>
            ),
          }
        )}
      </Text>
      <TextContent className="list-align-left">
        <TextList component={TextListVariants.ol}>
          <TextListItem component={TextListItemVariants.li}>
            {intl.formatMessage({
              id: 'cost.azure.storageAccountDescription',
              defaultMessage: 'From the Azure portal, add a new export.',
            })}
          </TextListItem>
          <TextListItem component={TextListItemVariants.li}>
            {intl.formatMessage({
              id: 'cost.azure.storageAccountDescription',
              defaultMessage:
                'Provide a name for the container and directory path, and specify the below settings to create the daily export. Leave all other options as the default.',
            })}
          </TextListItem>
        </TextList>
      </TextContent>
      <TextList className="export-table" component={TextListVariants.dl}>
        <TextListItem component={TextListItemVariants.dt}>
          <Text component={TextVariants.b}>
            {intl.formatMessage({
              id: 'cost.azure.exportType',
              defaultMessage: 'Export type',
            })}
          </Text>
        </TextListItem>
        <TextListItem component={TextListItemVariants.dd}>
          {intl.formatMessage({
            id: 'cost.azure.dailyExport',
            defaultMessage: 'Daily export for billing-period-to-date costs',
          })}
        </TextListItem>
        <TextListItem component={TextListItemVariants.dt}>
          <Text component={TextVariants.b}>
            {intl.formatMessage({
              id: 'cost.azure.storageAccountName',
              defaultMessage: 'Storage account name',
            })}
          </Text>
        </TextListItem>
        <TextListItem component={TextListItemVariants.dd}>
          {intl.formatMessage({
            id: 'cost.azure.createdAccountName',
            defaultMessage: 'Storage account name created earlier',
          })}
        </TextListItem>
      </TextList>
    </TextContent>
  );
};
