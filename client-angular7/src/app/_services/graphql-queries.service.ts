import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import gql from 'graphql-tag';

import { Gender, Group, Skills, Query } from '@app/_graphql_types';

@Injectable({ providedIn: 'root' })
export class GraphqlQueriesService {
    genders: Observable<Gender[]>;
    groups: Observable<Group[]>;
    skills: Observable<Skills[]>;
  
    constructor(private apollo: Apollo) { }

    ngOnInit() {}
  
    getGendersGroupsAndSkills(cb) {
      return this.apollo.watchQuery<Query>({
        query: gql`
          query {
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
          }
        `
      }).valueChanges.subscribe(({ data, loading, networkStatus }) => {
          if (7 === networkStatus && !loading) {
            let mappedGenders = data.genders.edges.map(el => ({id: el.node.id, name: el.node.name}));
            let mappedGroups = data.groups.edges.map(el => ({id: el.node.id, name: el.node.name}));
            let mappedSkills = data.skills.edges.map(el => ({id: el.node.id, itemName: el.node.name}));
            
            localStorage.setItem('genders', JSON.stringify(mappedGenders));
            localStorage.setItem('groups', JSON.stringify(mappedGroups));
            localStorage.setItem('skills', JSON.stringify(mappedSkills));
            
            cb({
              gender: mappedGenders, 
              group: mappedGroups, 
              skills: mappedSkills
            });
          }
      });
    }
}