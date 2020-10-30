#!/bin/bash
sed "s/{{BUILD_NUMBER}}/$1/g" deployments.yml  > deployments2.yml
sed "s/{{BUILD_TYPE}}/$2/g" deployments2.yml > deployments3.yml
sed "s/{{NAMESPACE}}/$3/g" deployments3.yml > deployments4.yml
sed "s/{{NODEPORT}}/$4/g" deployments4.yml > deployments5.yml