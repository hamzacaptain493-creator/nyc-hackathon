import { supabase } from "./supabase.js"
import { extractCommitment } from "./ai.js";

export async function createCommitment(rawInput) {

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not logged in");
  }

  const aiData = await extractCommitment(rawInput);

  const { data, error } = await supabase
    .from("commitments")
    .insert([
      {
        user_id: user.id,
        raw_input: rawInput,

        task: aiData.task,
        person: aiData.person,
        reason: aiData.reason,

        emotion: aiData.emotion,
        emotional_weight: aiData.emotional_weight,

        due_date: aiData.due_date,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function getCommitments() {

  const { data, error } = await supabase
    .from("commitments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function markAsKept(id) {

  const { data, error } = await supabase
    .from("commitments")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}


export async function deleteCommitment(id) {

  const { error } = await supabase
    .from("commitments")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
const handleSubmit = async () => {

   try{

      setLoading(true);

      await createCommitment(input);

      setInput("");

      navigate("/");

   }catch(err){

      console.log(err);

   }finally{

      setLoading(false);

   }

}