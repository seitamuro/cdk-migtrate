import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import path = require("path");

export interface FirstTemplateStackProps extends cdk.StackProps {}

export class FirstTemplateStack extends cdk.Stack {
  public constructor(
    scope: cdk.App,
    id: string,
    props: FirstTemplateStackProps
  ) {
    super(scope, id, props);

    // Resources
    const iamManagedPolicy00policyserviceroleAwsLambdaBasicExecutionRoleea738bc0298f49e090888d510d13e74c003F9wG =
      new iam.CfnManagedPolicy(
        this,
        "IAMManagedPolicy00policyserviceroleAWSLambdaBasicExecutionRoleea738bc0298f49e090888d510d13e74c003F9wG",
        {
          managedPolicyName:
            "AWSLambdaBasicExecutionRole-ea738bc0-298f-49e0-9088-8d510d13e74c",
          path: "/service-role/",
          description: "",
          groups: [],
          policyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Resource: "arn:aws:logs:us-east-1:230806776430:*",
                Action: "logs:CreateLogGroup",
                Effect: "Allow",
              },
              {
                Resource: [
                  "arn:aws:logs:us-east-1:230806776430:log-group:/aws/lambda/cdk_import_test:*",
                ],
                Action: ["logs:CreateLogStream", "logs:PutLogEvents"],
                Effect: "Allow",
              },
            ],
          },
          //roles: ["cdk_import_test-role-0g5z39xi"],
          users: [],
        }
      );
    iamManagedPolicy00policyserviceroleAwsLambdaBasicExecutionRoleea738bc0298f49e090888d510d13e74c003F9wG.cfnOptions.deletionPolicy =
      cdk.CfnDeletionPolicy.DELETE;

    const iamRole00cdkimporttestrole0g5z39xi00tBc2t = new iam.CfnRole(
      this,
      "IAMRole00cdkimporttestrole0g5z39xi00tBC2t",
      {
        path: "/service-role/",
        managedPolicyArns: [
          iamManagedPolicy00policyserviceroleAwsLambdaBasicExecutionRoleea738bc0298f49e090888d510d13e74c003F9wG.ref,
        ],
        maxSessionDuration: 3600,
        roleName: "cdk_import_test-role-0g5z39xi",
        assumeRolePolicyDocument: {
          Version: "2012-10-17",
          Statement: [
            {
              Action: "sts:AssumeRole",
              Effect: "Allow",
              Principal: {
                Service: "lambda.amazonaws.com",
              },
            },
          ],
        },
      }
    );
    iamRole00cdkimporttestrole0g5z39xi00tBc2t.cfnOptions.deletionPolicy =
      cdk.CfnDeletionPolicy.DELETE;
    /*iamManagedPolicy00policyserviceroleAwsLambdaBasicExecutionRoleea738bc0298f49e090888d510d13e74c003F9wG.addDependency(
      iamRole00cdkimporttestrole0g5z39xi00tBc2t
    );*/

    const iamRole = iam.Role.fromRoleArn(
      this,
      "ImportedRole",
      iamRole00cdkimporttestrole0g5z39xi00tBc2t.attrArn
    );
    const lambdaFunction00cdkimporttest00dd2Zi = new lambda.Function(
      this,
      "LambdaFunction00cdkimporttest00dd2Zi",
      {
        runtime: lambda.Runtime.PYTHON_3_12,
        handler: "lambda_function.lambda_handler",
        code: lambda.Code.fromAsset(
          path.join(
            __dirname,
            "../lambda",
            "cdk_import_test-306722b3-e93d-40f3-817e-57a4dab899a4.zip"
          )
        ),
        functionName: "cdk_import_test",
        role: iamRole,
        environment: {
          LOG_LEVEL: "INFO",
        },
      }
    );
  }
}
