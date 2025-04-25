![Frontend CI](https://github.com/Swistek92/monorepo/actions/workflows/frontend-ci.yml/badge.svg)


``
npx nx generate @nrwl/js:library consts --publishable --importPath @my-monorepo/consts --standalone
``
``
docker build -f apps/backend/Dockerfile -t my-backend .

docker run -p 3000:3000 my-backend
docker run -p 80:80 my-backend
docker run -it my-backend sh
docker stop $(docker ps -q)




// build 
docker build -t swistek/my-backend:latest .
docker login

docker push swistek/my-backend:latest
// 


docker-compose down
docker-compose down --volumes --remove-orphans


$ kubectl apply -f k8s-backend.yaml

kubectl port-forward svc/backend-service 3000:80

kubectl get pods
kubectl get services 


``