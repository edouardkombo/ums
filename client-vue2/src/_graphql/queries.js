import gql from 'graphql-tag';

//Get all genders, groups and skills
export default  {
    relations: gql `query {
        genders(first: 10){
            edges {
                cursor
                node {
                    id
                    name
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
            totalCount
        }
        groups(first: 10){
            edges {
                cursor
                node {
                    id
                    name
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
            totalCount
        }
        skills(first: 10){
            edges {
                cursor
                node {
                    id
                    name
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
            totalCount
        }
    }`        
};