import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { reportFormSchema } from "../schema";
import { createIssueWithImage, fetchIssues } from "../supabase/api/issues";
import useLoginToast from "../hooks/useLoginToast";
import { useAuth } from "../hooks/useAuth";

// Map service to categoryId
const serviceToCategoryId = {
  road: 2,
  electricity: 1,
  water: 3,
  garbage: 4,
};

function ReportForm() {
  const { session } = useAuth();
  useLoginToast();
  return (
    <div className="flex flex-col justify-center items-center">
      <Formik
        initialValues={{
          title: "",
          service: "",
          description: "",
          location: [],
          photo: null,
        }}
        validationSchema={reportFormSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (values.location.length !== 2) {
              alert("Please get your location first.");
              setSubmitting(false);
              return;
            }

            const categoryId = serviceToCategoryId[values.service] || null;

            const response = await createIssueWithImage({
              title: values.title,
              description: values.description,
              categoryId,
              locationCoords: values.location,
              file: values.photo,
              createdBy: session?.user.id,
            });

            if (response.success) {
              alert("Issue reported successfully!");
              resetForm();
            } else {
              console.error(response.error);
              alert("Failed to report issue. Check console for details.");
            }
          } catch (error) {
            console.error(error);
            alert("An unexpected error occurred.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className="border-0 shadow-2xl p-5 m-10 rounded-2xl max-w-[700px] w-full space-y-4">
            <h1 className="text-xl font-bold">Report a Civic Issue</h1>
            <p className="text-gray-600">
              Help us improve your neighborhood by reporting problems
            </p>

            <div>
              <label htmlFor="title" className="block font-medium">
                Issue title
              </label>
              <Field
                type="text"
                name="title"
                id="title"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="service" className="block font-medium">
                Choose a service:
              </label>
              <Field
                as="select"
                name="service"
                id="service"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select --</option>
                <option value="road">🛣️ Road</option>
                <option value="electricity">⚡ Electricity</option>
                <option value="water">💧 Water</option>
                <option value="garbage">🗑️ Garbage</option>
              </Field>
              <ErrorMessage
                name="service"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block font-medium">
                Detail description:
              </label>
              <Field
                as="textarea"
                name="description"
                id="description"
                className="w-full border border-gray-300 rounded-md px-3 h-24 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="photo" className="block font-medium">
                Upload Photo:
              </label>
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setFieldValue("photo", event.currentTarget.files[0])
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <ErrorMessage
                name="photo"
                component="div"
                className="text-red-500 text-sm"
              />
              {values.photo && (
                <img
                  src={URL.createObjectURL(values.photo)}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-md border"
                />
              )}
            </div>

            <div>
              <label className="block font-medium">Location (Lat, Lng):</label>
              <div className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100">
                {values.location.length === 2
                  ? `${values.location[0]}, ${values.location[1]}`
                  : "Not set"}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) =>
                      setFieldValue("location", [
                        position.coords.latitude,
                        position.coords.longitude,
                      ]),
                    (error) =>
                      console.error("Error getting location: " + error.message)
                  );
                } else {
                  alert("Geolocation is not supported by this browser.");
                }
              }}
              className="cursor-pointer w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Get Current Location
            </button>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className=" cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>

      {/* Quick Response Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-5 w-full p-10">
        <div className="border border-gray-300 shadow-2xl rounded-2xl max-w-fit max-h-fit p-5 flex flex-col gap-2 justify-center items-center">
          <svg
            className="text-blue-800 text-center"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
            <path d="m9 11 3 3L22 4"></path>
          </svg>
          <h1 className="text-lg font-semibold">Track Progress</h1>
          <p>Real-time status updates</p>
        </div>

        <div className="border border-gray-300 shadow-2xl rounded-2xl max-w-fit max-h-fit p-5 flex flex-col gap-2 justify-center items-center">
          <svg
            className="text-blue-800 text-center"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
            <path d="m9 11 3 3L22 4"></path>
          </svg>
          <h1 className="text-lg font-semibold">Quick Response</h1>
          <p>Issues addressed within 48 hours</p>
        </div>

        <div className="border border-gray-300 shadow-2xl rounded-2xl max-w-fit max-h-fit p-5 flex flex-col gap-2 justify-center items-center">
          <svg
            className="text-blue-800 text-center"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
            <path d="m9 11 3 3L22 4"></path>
          </svg>
          <h1 className="text-lg font-semibold">Community Impact</h1>
          <p>Join 1000+ active citizens</p>
        </div>
      </div>
    </div>
  );
}

export default ReportForm;
