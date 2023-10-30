import { Button, HelperText, Input, Label } from "@windmill/react-ui";
import { useForm } from "react-hook-form";
import Layout from "layout/Layout";
import API from "api/axios.config";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import {
  PublishCommand,
  SNSClient,
  SubscribeCommand,
  UnsubscribeCommand,
} from "@aws-sdk/client-sns";

export const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Layout>
      <div className="w-full">
        <h1 className="text-3xl text-center mb-4 font-semibold">Address Details</h1>
        <form
          className="border p-4 border-black-4 w-full md:w-1/2 mx-auto"
          onSubmit={handleSubmit(async (data) => {
            const token = localStorage.getItem("token");
            const response = API.post(
              "/products",
              { ...data, price: +data.price },
              {
                headers: {
                  Authorization: token,
                },
              }
            );

            await toast.promise(response, {
              loading: "Creating product",
              success: "Product created",
              error: "Ops. An error occoured",
            });

            const decoded = jwt_decode(token);
            if (decoded && decoded.email) {
              const TopicArn = "arn:aws:sns:us-east-1:585934845312:create-product";
              const snsClient = new SNSClient({
                region: "us-east-1",
                credentials: {
                  accessKeyId: "AKIAYQ3DQGWAMGKPDZRU",
                  secretAccessKey: "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",
                },
              });
              const response = snsClient.send(
                new SubscribeCommand({
                  Protocol: "email",
                  TopicArn,
                  Endpoint: decoded.email,
                })
              );

              response.catch((error) => console.error(error));
              toast.promise(response, {
                loading: "Sending Email",
                success: "Email Sent",
                error: "Ops. An error occoured when sending email",
              });

              try {
                const subscribeResponse = await response;
                await snsClient.send(
                  new PublishCommand({
                    Message: `Product ${data.name} was created`,
                    TopicArn,
                  })
                );

                new UnsubscribeCommand({
                  TopicArn,
                  SubscriptionArn: subscribeResponse.SubscriptionArn,
                });
              } catch (err) {
                console.error(err);
              }
            }
          })}
        >
          <Label className="block text-grey-darker text-sm font-bold mb-4">
            <span>Name</span>
            <Input
              type="text"
              className="shadow appearance-none rounded w-full text-grey-darker mt-2 px-2 py-2 border focus:outline-none"
              name="name"
              {...register("name", { required: "Required" })}
            />
            {errors.name && <HelperText valid={false}>{errors.name.message}</HelperText>}
          </Label>
          <Label className="block text-grey-darker text-sm font-bold mb-4">
            <span>Price</span>
            <Input
              className="shadow appearance-none rounded w-full text-grey-darker mt-2 px-2 py-2 border focus:outline-none"
              type="number"
              name="price"
              {...register("price", { required: "Required" })}
            />
            {errors.price && <HelperText valid={false}>{errors.price.message}</HelperText>}
          </Label>
          <Label className="block text-grey-darker text-sm font-bold mb-4">
            <span>Description</span>
            <Input
              className="shadow appearance-none rounded w-full text-grey-darker mt-2 px-2 py-2 border focus:outline-none"
              type="text"
              name="description"
              {...register("description", { required: "Required" })}
            />
            {errors.description && (
              <HelperText valid={false}>{errors.description.message}</HelperText>
            )}
          </Label>
          <Label className="block text-grey-darker text-sm font-bold mb-4">
            <span>Image URL</span>
            <Input
              className="shadow appearance-none rounded w-full text-grey-darker mt-2 px-2 py-2 border focus:outline-none"
              type="text"
              name="image_url"
              {...register("image_url", { required: "Required" })}
            />
            {errors.image_url && <HelperText valid={false}>{errors.country.message}</HelperText>}
          </Label>
          <div className="flex">
            <Button block type="submit" size="small">
              Create
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
