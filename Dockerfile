FROM node:19 
WORKDIR /samuel/src/app  
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3311
CMD ["node", "dist/main"]