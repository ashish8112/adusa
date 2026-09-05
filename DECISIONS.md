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


4.Problem Faced 
1. N+1 Query problem during check on each post that user has liked or not to show like and unlike button accordingly 

Solution: 1.Created OptionalAuthentication Middleware for logged out user and in public route send checkLike as well as get feed with one api request 
I got everything check getFeed method in postController file 

5.Problem -  When I am clicking like button or unlike button why it is taking time to reflect or render on screen ? 

because updating of useState depend on asynchronous method of calling toggleLike api so it takes till it respond that's why it's slow 

Solution: added changing ui manually before api respond using Optimistic Update: Change UI immediately and let api respond, if it fails suppose internet is 
down or backend or database is down in catch rollback to previous state because before changing ui we have saved previous state. 
//Location of solution : PostCard.jsx in toggleLike method

6.Profile update - destructuring vs whitelist loop
Started as const {bio, college, avatar} = req.body. Chose Whitelist loop because if new field comes only I have to change array ex 
I decided to give new update option so I will need only one place to change in my api else that field will blocked -> look at userController.js updateUserById

7.Problem in postCard like button associated with togglelike function if user was null even though function was executing causing to send 
request to backend although backend always responded  with 401 status code I have never seen any broking ui because I was redirected to 
login page with error message session expired login please which was wrong but when I go back with login then I saw broke ui which was handled by my 
error boundary then I got to know there was issue. so I fixed using guard on function that if user is null return to login page with proper message 
instead of calling backend