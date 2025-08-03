"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  title: z.string().min(1),
  address: z.string().min(1),
  distance: z.string().min(1),
  price: z.string().min(1),
  dateRange: z.string().min(1),
  rating: z.coerce.number().min(0).max(5),
  description: z.string().min(1),
  videoUrl: z.string().url("Must be a valid URL"),
  images: z.any().refine((files) => files?.length > 0, "At least one image is required."),
});

type FormData = z.infer<typeof formSchema>;

export default function CreatePropertyForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "images") {
        (value as File[]).forEach((img) => formData.append("images", img));
      } else {
        formData.append(key, value as string);
      }
    });

    const res = await fetch("/api/properties/create", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setLoading(false);

    if (res.ok) {
      alert("Property created successfully!");
      console.log(result);
    } else {
      alert("Error creating property.");
      console.error(result);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">Create New Property</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Title</Label>
          <Input {...register("title")} />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <Label>Address</Label>
          <Input {...register("address")} />
          {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
        </div>

        <div>
          <Label>Distance</Label>
          <Input {...register("distance")} />
          {errors.distance && <p className="text-sm text-red-500">{errors.distance.message}</p>}
        </div>

        <div>
          <Label>Price</Label>
          <Input {...register("price")} />
          {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
        </div>

        <div>
          <Label>Date Range</Label>
          <Input {...register("dateRange")} />
          {errors.dateRange && <p className="text-sm text-red-500">{errors.dateRange.message}</p>}
        </div>

        <div>
          <Label>Rating (0-5)</Label>
          <Input type="number" step="0.1" {...register("rating")} />
          {errors.rating && <p className="text-sm text-red-500">{errors.rating.message}</p>}
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <Textarea rows={4} {...register("description")} />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <Label>Video URL</Label>
        <Input {...register("videoUrl")} />
        {errors.videoUrl && <p className="text-sm text-red-500">{errors.videoUrl.message}</p>}
      </div>

      <div>
        <Label>Gallery Images</Label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setValue("images", Array.from(e.target.files ?? []))}
        />
        {errors.images && <p className="text-sm text-red-500">{errors.images.message as string}</p>}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Property"}
      </Button>
    </form>
  );
}
