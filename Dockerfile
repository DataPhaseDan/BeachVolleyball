# Use the official Node.js runtime as the base image
FROM node:18

# Set the working directory in the Docker container
WORKDIR /usr/local/beach_volley_ball

# Copy package.json and package-lock.json into the Docker container
COPY ./package*.json /usr/local/beach_volley_ball/db_fill/
COPY ./package*.json /usr/local/beach_volley_ball/app/
COPY ./tsconfig.json /usr/local/beach_volley_ball/



WORKDIR /usr/local/beach_volley_ball/db_fill
RUN mkdir -p /usr/local/beach_volley_ball/db_fill/json
# Install the application dependencies inside the Docker container
RUN npm install

WORKDIR /usr/local/beach_volley_ball/app
RUN npm install

# Copy the application code into the Docker container
COPY  /db_fill/ /usr/local/beach_volley_ball/db_fill/
COPY /app/ /usr/local/beach_volley_ball/app/


# Expose port 3000 to the outside
EXPOSE 3000

# Start the application
CMD [ "npm","start" ]
