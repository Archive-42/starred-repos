import Q from 'q';
import API from 'js/lib/api';
import URI from 'jsuri';

import type { AuthoringCourseBranchConstructorProps } from 'bundles/author-common/models/AuthoringCourseBranch';

import type { AuthoringBranchPropertiesV1 } from 'bundles/naptimejs/resources/__generated__/AuthoringBranchPropertiesV1';

// Autogenerated AuthoringBranchPropertiesV1 have incorrect properties types.
type BranchProperties = Omit<AuthoringCourseBranchConstructorProps, 'id'>;

type FixedAuthoringBranchPropertiesV1 = Omit<AuthoringBranchPropertiesV1, 'properties'> & {
  properties: BranchProperties;
};

type AuthoringBranchPropertiesV1Connection = {
  elements: Array<FixedAuthoringBranchPropertiesV1> | null;
};

const authoringBranchPropertiesAPI = API('/api/authoringBranchProperties.v1', {
  type: 'rest',
});

const BranchAPIUtils = {
  getBranch(branchId: string) {
    const uri = new URI(branchId).addQueryParam('fields', 'properties,conflictMetadata');
    return Q(authoringBranchPropertiesAPI.get(uri.toString())).then((response: AuthoringBranchPropertiesV1Connection) =>
      response.elements?.map((branch) => ({
        id: branch.id,
        conflictMetadata: branch.conflictMetadata,
        ...branch.properties,
      }))
    );
  },
  getBranches(courseId: string, includeUnlisted = false) {
    const uri = new URI()
      .addQueryParam('q', 'course')
      .addQueryParam('courseId', courseId)
      .addQueryParam('fields', 'properties,conflictMetadata');

    if (includeUnlisted) {
      uri.addQueryParam('includeUnlisted', true);
    }

    return Q(authoringBranchPropertiesAPI.get(uri.toString())).then((response: AuthoringBranchPropertiesV1Connection) =>
      response.elements?.map((branch) => ({
        id: branch.id,
        conflictMetadata: branch.conflictMetadata,
        ...branch.properties,
      }))
    );
  },
};

export default BranchAPIUtils;

export const { getBranches } = BranchAPIUtils;
