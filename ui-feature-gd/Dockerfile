# stage; 1
FROM 10.5.35.127:30114/nginx:1.18.0
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]