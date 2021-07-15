import { gql } from "apollo-boost";

export const GET_ART = gql`
  query GetArt($id: ID!) {
    art(id: $id) {
      id
      price
      remainingAmount
    }
  }
`;

export const GET_ARTS = gql`
  {
    arts {
      id
      price
      remainingAmount
    }
  }
`;

export const GET_TOKENS = gql`
  {
    tokens {
      id
      owner
      art {
        id
      }
      tokenURI
    }
  }
`;

export const GET_TOKENS_USER_OWNED = gql`
  query GetTokensUserOwned($owner: String!) {
    tokens(where: { owner: $owner }) {
      id
      owner
      art {
        id
      }
      tokenURI
    }
  }
`;
