Feature: Add a comment to the LambdaTesters Blog

  Background:
    Given the user is on the homepage

  @valid_blog_filling_all_required_details
  Scenario: Adding a valid comment to the blog
    When the user clicks on the Blog button
    Then the user selects any article from the blog
    And the user is navigated to the selected blog page
    When the user enters the following comment details:
      | name | email            | comment                                                                |
      | Jeev | jeev@example.com | This blog was very informative and well written. Keep it up!           |
      # | Arun  | arun@example.com | Great insights! I learned a lot from this article.                  |
    And the user clicks on the Post Comment button
    Then the user should see the message "Thank you for your comment. It has been submitted to the webmaster for approval."
