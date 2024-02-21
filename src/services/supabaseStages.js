import supabase from "./supabaseClient";

const Response = {
  success: "success",
  error: "error",
};

export const getStageById = async (stageId) => {
  let { data: stage, error } = await supabase.from('stages').select(`*,profiles(*)`).eq("id", stageId).single();
  if (error) {
    return { result: Response.error, data: error };
  }
  return { result: Response.success, data: stage };
}

export const getStagesRange = async ({ start, end }) => {
  let { data: stages, error } = await supabase.from('stages').select().range(start, end);
  if (error) {
    return { result: Response.error, data: error };
  }
  return { result: Response.success, data: stages };
}

export const getStagesRangeSortByDesc = async ({ start, end }) => {
  // NOTE : 追加順 = 制作日時が古い順になるはずなので、idでソートしています。
  //        制作日のほうが都合良ければorderのカラム名変更していただければ！
  let { data: stages, error } = await supabase.from('stages').select().range(start, end).order('id', { ascending: false });
  if (error) {
    return { result: Response.error, data: error };
  }
  return { result: Response.success, data: stages };
}

export const getStagesCount = async () => {
  let { error, count } = await supabase.from('stages').select('id', { count: 'exact' });
  if (error) {
    return { result: Response.error, data: error };
  }
  return { result: Response.success, count: count };
}

export const getStagesCountByUserId = async (userId) => {
  let { error, count } = await supabase.from('stages').select('id', { count: 'exact' }).eq('profile_id', userId);
  if (error) {
    return { result: Response.error, data: error };
  }
  return { result: Response.success, count: count };
}