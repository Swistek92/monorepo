![Frontend CI](https://github.com/Swistek92/monorepo/actions/workflows/frontend-ci.yml/badge.svg)


``
npx nx generate @nrwl/js:library consts --publishable --importPath @my-monorepo/consts --standalone
``

docker build -f apps/backend/Dockerfile -t my-backend .

$ docker run -p 3000:3000 my-backend
$ docker run -it my-backend sh
