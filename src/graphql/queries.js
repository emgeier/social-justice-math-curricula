/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchLessonPlans = /* GraphQL */ `
  query SearchLessonPlans(
    $filter: SearchableLessonPlanFilterInput
    $sort: [SearchableLessonPlanSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableLessonPlanAggregationInput]
  ) {
    searchLessonPlans(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        title
        description
        mathTopic
        socialJusticeTopic
        teacher
        approved
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getLessonPlan = /* GraphQL */ `
  query GetLessonPlan($id: ID!) {
    getLessonPlan(id: $id) {
      id
      title
      description
      mathTopic
      socialJusticeTopic
      teacher
      approved
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLessonPlans = /* GraphQL */ `
  query ListLessonPlans(
    $filter: ModelLessonPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessonPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        mathTopic
        socialJusticeTopic
        teacher
        approved
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
