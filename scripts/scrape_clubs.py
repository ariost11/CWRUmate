import requests
from bs4 import BeautifulSoup

def get_html():
    """
    Gets the html content from campus groups. This method should only be run once.
    """

    url = "https://community.case.edu/club_signup?view=all&"

    response = requests.get(url)

    if response.status_code == 200:
        html_content = response.text

    with open("campus_groups.html", "w") as file:
        file.write(html_content)

def get_club_name(tag):
    """
    Find the club name nested in a given tag
    """

    if tag.name == 'h2':
        a_tag = tag.find('a')
        if a_tag:
            return a_tag
        
    for child in tag.find_all(recursive=False):
        result = get_club_name(child)
        if result:
            return result
        
    return None

def print_clubs():
    """
    Parse the campus groups HTML and print out the club names
    """

    with open("campus_groups.html", "r") as file:
        html_content = file.read()

    soup = BeautifulSoup(html_content, "html.parser")

    list_items = soup.find_all("li", class_="list-group-item")

    for item in list_items:
        club_name = get_club_name(item)

        if club_name:
            club_name = club_name.text.strip()
            print(club_name)

if __name__ == "__main__":
    print_clubs()