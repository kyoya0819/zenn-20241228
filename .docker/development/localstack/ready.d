#!/usr/bin/env bash
awslocal s3 mb s3://test
awslocal ses verify-email-identity --email noreply@example.com