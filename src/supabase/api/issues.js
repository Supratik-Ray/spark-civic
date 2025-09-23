import supabase from "../supabaseClient";
import { generateTicketNo } from "../utils/generateTicketNo";
import { uploadImage } from "../utils/uploadImage";

//////////////////////DOCUMENTATION//////////////////////////

///////ALL FUNCTIONS RETURN:
//✅IF SUCCESS -> {success: true,data:{.....}}
//❌IF FAILED -> {success:false,error:"error message"}

////EXAMPLES://///

/////⚠️GET REQUESTS//////

//for all issues:
//const allIssues = await fetchIssues();

//if some filters required:
//const pendingIssues = await fetchIssues({ status: 'pending', category_id: 2 });

//nearby issues within a radius:
/*
const nearbyIssues = await fetchIssues({
  lon: 88.4304,
  lat: 26.7206,
  radius: 3000, // 3 km
});
*/

//combining of filters with location:
/*
const nearbyInProgress = await fetchIssues({
  lon: 88.4304,
  lat: 26.7206,
  radius: 5000,
  status: 'in_progress',
  assigned_to: 'user-uuid-here',
});
*/

//fetch issue by Id:
//const issue = await fetchIssueById(id)

///////⚠️POST REQUEST////////////

// const newIssue = {
//       title: "Pothole on Main Street",
//       description: "Large pothole causing traffic issues",
//       categoryId: 2, // e.g., category 2 = "Road"
//       locationCoords: [22.5726, 88.3639], // [lat, lon]
//       file: document.getElementById("issueImage").files[0], // image from file input
//       createdBy: "a7c91f82-9d6a-4a45-8e2a-5d3fdf12c9b7", // user UUID
//       assignedTo: null, // optional, can be assigned later
//     };

//     const { data, error } = await createIssueWithImage(newIssue);

//////⚠️UPDATE REQUESTS/////////

//Update only title/description/etc.:
//await updateIssue(issueId, { title: "New title", description: "Updated description" });

//Update status(updatedBy required):
//await updateIssue(issueId, { status: "in_progress", updatedBy: currentUserId });

////////⚠️DELETE REQUESTS/////////
//await deleteIssueById(issueId);

//////////////////IMPLEMENTATION///////////////////////

// 1) CREATE ISSUE WITH IMAGE
export const createIssueWithImage = async ({
  title,
  description = null,
  categoryId = null,
  locationCoords,
  file = null,
  createdBy,
  assignedTo = null,
}) => {
  try {
    console.log(
      title,
      description,
      categoryId,
      locationCoords,
      file,
      createdBy,
      assignedTo
    );
    // Validate locationCoords
    if (
      !Array.isArray(locationCoords) ||
      locationCoords.length !== 2 ||
      !locationCoords.every((coord) => typeof coord === "number")
    ) {
      throw new Error(
        "locationCoords must be an array of two numbers: [lat, lon]"
      );
    }

    // Create Ticket No
    const ticketNo = generateTicketNo();
    let photos = [];

    if (file) {
      const imageUrl = await uploadImage(file);

      photos.push(imageUrl);
    }

    const { data, error } = await supabase.rpc("create_issue", {
      _ticket_no: ticketNo,
      _title: title,
      _description: description,
      _category_id: categoryId,
      _location_coords: locationCoords,
      _photos: photos,
      _created_by: createdBy,
      _assigned_to: assignedTo,
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// 2) FETCH ISSUES
export const fetchIssues = async (filters = {}) => {
  try {
    const {
      lon = null,
      lat = null,
      radius = 5000,
      status = null,
      category_id = null,
      assigned_to = null,
      created_by = null,
    } = filters;

    const { data, error } = await supabase.rpc("get_issues_filtered", {
      _lon: lon,
      _lat: lat,
      _radius_meters: radius,
      _status: status,
      _category_id: category_id,
      _assigned_to: assigned_to,
      _created_by: created_by,
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// 3) FETCH ISSUE BY ID
export const fetchIssueById = async (issueId) => {
  try {
    const { data, error } = await supabase.rpc("get_issue_by_id", {
      _id: issueId,
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// 4) UPDATE ISSUE
export const updateIssue = async (issueId, updates = {}) => {
  try {
    const {
      status = null,
      updatedBy = null,
      title = null,
      description = null,
      assignedTo = null,
      categoryId = null,
    } = updates;

    // If status is being updated, updatedBy is required
    if (status && !updatedBy) {
      throw new Error("updatedBy is required when changing status");
    }

    const { data, error } = await supabase.rpc("update_issue", {
      _issue_id: issueId,
      _status: status,
      _updated_by: updatedBy,
      _title: title,
      _description: description,
      _assigned_to: assignedTo,
      _category_id: categoryId,
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// 5) DELETE ISSUE BY ID
export const deleteIssueById = async (issueId) => {
  try {
    const { data, error } = await supabase
      .from("issues")
      .delete()
      .eq("id", issueId);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
