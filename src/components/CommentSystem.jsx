import React, { useState, useEffect } from 'react';
import { createIssueComment, fetchCommentsByIssueId } from '../supabase/api/comments';

const CommentSystem = ({ issueId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch comments when component mounts or issueId changes
  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const { success, data, error } = await fetchCommentsByIssueId(issueId);

        if (success) {
          setComments(data);
          console.log("commets: ",data);
          setError(null);
        } else {
          setError(error?.message || 'Failed to fetch comments');
        }
      } catch (err) {
        setError('Failed to fetch comments');
      } finally {
        setLoading(false);
      }
    };

    if (issueId) {
      getComments();
    }
  }, [issueId]);

  // Handle adding a new comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim() || !currentUser?.id) return;

    try {
      setLoading(true);
      const { success, error } = await createIssueComment({
        issue_id: issueId,
        user_id: currentUser.id,
        comment: newComment.trim(),
      });

      if (success) {
        // Refetch comments
        const { success: fetchSuccess, data } = await fetchCommentsByIssueId(issueId);
        if (fetchSuccess) setComments(data);
        setNewComment('');
        setError(null);
      } else {
        setError(error?.message || 'Failed to post comment');
      }
    } catch (err) {
      setError('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>

      {/* Comment List */}
      <div className="mb-6">
        {loading && comments.length === 0 ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 pb-4 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center mb-2">
                <strong className="text-gray-800 mr-2">
                  {comment.profiles?.full_name || 'Unknown User'}
                </strong>
                {comment.profiles?.role && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md">
                    {comment.profiles.role}
                  </span>
                )}
                <span className="ml-auto text-xs text-gray-500">
                  {formatDate(comment.created_at)}
                </span>
              </div>
              <div className="text-gray-700">{comment.comment}</div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        {currentUser ? (
          <>
            <h4 className="font-medium text-gray-700 mb-3">Post Comment</h4>
            {error && (
              <div className="mb-3 p-2 bg-red-100 text-red-700 text-sm rounded-md">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmitComment}>
              <div className="flex items-center mb-3">
                <strong className="text-gray-800 mr-2">
                  {currentUser.full_name || 'You'}
                </strong>
                {currentUser.role && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-md">
                    {currentUser.role}
                  </span>
                )}
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add your comment..."
                rows="4"
                disabled={loading}
                className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading || !newComment.trim()}
                className={`mt-3 px-4 py-2 font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  loading || !newComment.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                }`}
              >
                {loading ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          </>
        ) : (
          <p className="text-gray-500">Please log in to post comments.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSystem;
