1.Problem - Do I have to load entire database ? 
Implemented off-set(skip) pagination 
that means fetch data from database which is needed to display on one page instead of entire database collection 
which avoid
*heavy json file as if documents are a lot helps user to save a lot of data 
* delay in response in free tier 
* useless data as we need suppose 5 posts in page , which can cause extra memory usages and slow rendering and can cause 
crash in application 

Some Drawbacks 
1.Slow Performance : as the offset number gets very high, database has to scan and throw all the previous rows,which makes queries slow

2.Data Shifts : If new items are added or deleted while a user is browsing, rows can shift, causing users to see duplicate item or skip records entirely.

conclusion 
Lower Memory Usages
Faster Page loads because transferring a tiny slice of data takes milliseconds,
Reduced Database load 
Saved Bandwidth(Internet usages)
Gradual Rendering.




2.Problem - Feed Monopolization (Author Diversity Problem)

Cause is NOT pagination. Cause is chronological sort (createdAt:-1).
Pagination only slices the result, ordering decides who fills it.
So even with cursor pagination the same user floods the feed.

Scenario : rate limit 5 posts/hr * 8 hrs = 40 posts by one user
sitting on top of everyone else's feed. New users see one person only.

Options considered

1.Rate limiting (5 posts/hr, returns 429)  IMPLEMENTED
    * slows monopolization, does NOT prevent it
    * honest tradeoff, not a fix

2.Per page author cap (max 2 posts per author on each page) NOT IMPLEMENTED
    * skip/limit pagination is stateless, every request is independent
    * page 2 does not know who was already filtered out on page 1
    * causes missing posts and duplicates across pages

3.Global author cap using aggregation pipeline CORRECT FIX, Planned for Phase 6
    * $setWindowFields + $documentNumber to rank posts per author
    * keep only top 2 posts per author across the WHOLE feed, then paginate
    * $lookup + $unwind instead of populate (populate is a second query,
      aggregation does the join inside the database)

4.Ranking score instead of pure time  Planned for Phase 6
    * score = likes*2 + comments*3 - hoursOld*0.5
    * old post with engagement can beat a fresh spam post

Why deferred and not done now
    * aggregation pipeline is a 2-3 session topic on its own
    * with ~10 test users and low post volume the 40 post scenario does not exist
    * fixing a problem that does not exist yet is premature optimization

conclusion
Rate limiting is a partial fix, accepted knowingly.
The real fix is known, designed and scheduled - not unknown.


3.Interceptors for sending and receiving the api
Problem -> There are two meaning of 401 response code according to my backend one is token invalid or expired and another one is login failed, how to distinguish both 

Solution : if 401 comes from login url means login failed send err response to component to display error login failed to user 
           if 401 comes from any other ulr or api endpoint means your token (JWT) is expired or invalid or tampered anyhow so redirect the 
           use to login page with proper message of token is invalid or expired.
Note : interceptor must end with return Promise.reject(error) , not return error. because return error would resolve the promise, so the 
component's catch block would never run and a failed request would silently look like a success.

Solution Core : distinguished using error.config.url not by matching the error message string. because it will fail if string changes in backend

4.Problem Faced 
1. N+1 Query problem means 1 query for fetching all posts of feed and then N (no of posts) request to check on each post that user has liked or not to show like and unlike button accordingly 

Solution: 1.Created OptionalAuthentication Middleware for logged out user and in public route send checkLike as well as get feed with one api request means feed with user has liked or not that specific post in 1 query
I got everything check getFeed method in postController file 

5.Problem -  When I am clicking like button or unlike button why it is taking time to reflect or render on screen ? 

because updating of useState depend on asynchronous method of calling toggleLike api so it takes till it respond that's why it's slow 

Solution: added changing ui manually before api respond using Optimistic Update: Change UI immediately and let api respond, if it fails suppose internet is 
down or backend or database is down in catch rollback to previous state because before changing ui we have saved previous state. 
//Location of solution : PostCard.jsx in toggleLike method

6.Profile update - destructuring vs whitelist loop
Started as const {bio, college, avatar} = req.body. Chose Whitelist loop because if new field comes only I have to change array example
I decided to give new update option so I will need only one place to change in my api else that field will blocked -> look at userController.js updateUserById

7.Problem in postCard like button associated with togglelike function if user was null even though function was executing causing to send 
request to backend although backend always responded  with 401 status code I have never seen any broking ui because I was redirected to 
login page with error message session expired login please which was wrong but when I go back with login then I saw broke ui which was handled by my 
error boundary then I got to know there was issue. so I fixed using guard on function that if user is null return to login page with proper message 
instead of calling backend

8.Problem - POST posts/:id/like is a toggle so the result of like depends on how many times it's called. but Two fast taps with optimistic UI create a race condition because each toggleLike function is holding it's own previous snapshot (because of closure) and it can cause wrong update on screen if some api's fail. so last state of component is only decides by whichever response at last.

Fix for now : used synchronous useRef guard, only one request in flight at a time. 
why not useState because useState is asynchronous 

Note: Still this is not solution as two browser tabs with direct API call for same component of same user will cause  reaching a wrong state.

Real Fix, 
In differnet Phase , split toggleLike api of backend into idempotent routes. 
PUT /posts/:id/like -> $addToSet, always 
Delete /posts/:id/like -> $pull, always 

now server will not check current state . Calling put multiple times give the same result as once, so request orders stop mattering

9. Security Problem - getAllUsers route was existing in my backend which was returning everything about user except password and didn't required authentication 

Solution : deleted the routed because it was designed for getting all users info but is not required , any need of users is covers by profile page route in backend. 

I have changed multiple things in backend because of this . 
instead of, .select() and blacklist the password like .select(-password) 
moved to whitelist 

.select() from blacklist to whitelist
Blacklist .select("-password")  -> send everything except password 
Whitelist .select ("name bio avatar college") -> send only these four field

Blacklist can create major security flaws in future because it is like send everything except this but suppose In future when I add some sensitive info about user and didn't forget to remove from backend some routes may send all info so from the default "send it " I moved to default "do not send" 
so  forgetting will not cause security issue only required field is not getting to client which I can fix but security data which is leaked I can't

Rule which I adapted : pick the design where forgetting is safe. 

10. Security check - can a user edit someone else's profile?

Test: copied another user's id from the URL, edited localStorage
adusaUser.id to that id, refreshed. Edit Profile button appeared on
their profile and the form opened.

Result: NO data breach. My own profile got updated, not theirs.

Why: PUT /api/users/update takes the id from req.user.id, which
verifyToken reads from the signed JWT. It never reads an id from the
URL, the body, or localStorage. Changing localStorage changes what the
UI shows, not who the server thinks I am.

Deliberate design: the route has no :id param. If it were
PUT /api/users/update/:id it would be a real IDOR vulnerability.

Remaining issue is UI only: isOwnProfile is computed from localStorage
user.id vs the URL id, so a tampered localStorage shows the button on
someone else's profile. Harmless but misleading. Not fixing it by
adding more client checks - a client check can always be tampered.

Rule: client side checks are for UI, server side checks are for
security. Never confuse the two.

11. Security check - can a user edit someone else's profile? (IDOR - Insecure Direct Object Reference.)

Test: copied another user's id from the URL, edited localStorage
adusaUser.id to that id, refreshed. Edit Profile button appeared on
their profile and the form opened.

Result: NO data breach. My own profile got updated, not theirs.

Why: PUT /api/users/update takes the id from req.user.id, which
verifyToken reads from the signed JWT. It never reads an id from the
URL, the body, or localStorage. Changing localStorage changes what the
UI shows, not who the server thinks I am.

Remaining issue is UI only: isOwnProfile is computed from localStorage
user.id vs the URL id, so a tampered localStorage shows the button on
someone else's profile. Harmless but misleading. Not fixing it by
adding more client checks - a client check can always be tampered.
