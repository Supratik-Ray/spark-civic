import * as Yup from 'yup';

export const reportFormSchema =Yup.object({
          title: Yup.string().required("Title is required"),
          service: Yup.string().required("Please choose a service"),
          description: Yup.string().required("Description is required"),
          location: Yup.array().of(Yup.number()).length(2).required(),
          photo: Yup.mixed().required("Photo is required"), // ✅ validate photo
        });