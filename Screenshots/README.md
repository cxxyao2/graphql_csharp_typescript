# OrderManagement

A fullstack App to maintain track of customers and orders

## VSCODE extensions

- nuget package manager
- Material Icon Theme
- c# extensions
- GraphQL: Syntax Highlighting
- SQLite

## Backend Dotnet commands

- `dotnet new webapi --framework net7.0`
- `dotnet new classlib --framework net7.0 -o Infrastructure`
- `dotnet sln add API`
- `dotnet sln add Infrastructure`
- `dotnet sln add Core`

- `cd API`
- `dotnet add refernce ../Infrastructure`

- `dotnet restore`

- `cd API`

-`dotnet watch run`

### Migrate database

- cd backend
- dotnet ef migrations add InitialCreate -p .\Infrastructure\ -s .\API\

### Docker Commands

- `docker build -t yourname/ordermanagementapp  .`
- `docker run --rm -it -p 8080:80 yourname/ordermanagementapp`
  - modify graphql url and port for your frontend accordingly
- `docker push yourname/ordermanagementapp:latest`
- `docker run --name dev -e POSTGRES_USER=admin -e POSTGRE_PASSWORD=secret -p 5432:5432 -d postgre:latest`

## Frontend React

### Commands

- `yarn create vite` ( react, typescript, project-name: ordermanagement)
- `cd ordermanagement`
- `yarn`
- `yarn graphql-codegen init`
  - what is your schema: (dotnet watch run) `http://localhost:5170/graphql/`
  - where are your operations and fragments? `**/*.{gql,graphql}`
  - where to write the output: `src/gql`
  - Do you want to generate an introspection file? `No`
  - How to name the config file? `codegen.ts`
  - what script in package.json should run the codegen? codegen
- `yarn run codegen`
- Run Frontend APP: `yarn dev`

### Tools

- GraphQL
- Apollo client
  - Make the requests and caches our objects
- GraphQL Code generator
  - Generates templated code to consume the already created queries based on the backend shcema
- Styling
  - Material UI React
- Routing
  - React Router
- UI: AG Grid

## References

- https://graphql.org/
- https://the-guild.dev/graphql/codegen
- https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-apollo
- What are the different types available in GraphQL?
  GraphQL has several built-in scalar types that represent different kinds of data. These scalar types are the fundamental building blocks of GraphQL schemas. The different scalar types available in GraphQL are:

  – String: A UTF-8 character sequence.
  – Int: A signed 32-bit integer.
  – Float: A signed double-precision floating-point value.
  – Boolean: True or false.
  – ID: A unique identifier, often used to refetch an object or as a key for caching.
