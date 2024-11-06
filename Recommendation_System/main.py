from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Set
from datetime import datetime, timezone

app = FastAPI()

class User(BaseModel):
    id: str
    city: str
    skills: List[str]

class Internship(BaseModel):
    mongo_id: str
    companyname: str
    position: str
    provider: str = None
    internshiptype: str
    city: List[str]
    openings: int
    stipend: int
    deadline: str
    desc: str
    jd: str
    skills: List[str]

class AppliedAggregate(BaseModel):
    companynames: Set[str]
    positions: Set[str]
    cities: Set[str]
    stipend: float
    desc: Set[str]
    jd: Set[str]
    skills: Set[str]
    internshipSkills: Set[str]

class ExtendedInternship(Internship):
    internshipSkills: List[str]

# Define the AppliedInternship model using the extended model
class AppliedInternship(BaseModel):
    internshipId: ExtendedInternship

@app.post("/api/user/fetchRecommendations")
async def get_recommendations(user: User, internships: List[Internship], applieds: List[AppliedInternship]):
    matched_internships = match_internships_with_user_skills(user, internships, applieds)
    # Filter out internships that have passed their deadline
    current_date = datetime.now(timezone.utc)
    matched_internships = [internship for internship in matched_internships if datetime.strptime(internship['internship'].deadline, '%Y-%m-%dT%H:%M:%S.%f%z') >= current_date]
    return {"matched_internships": matched_internships}

def match_internships_with_user_skills(user: User, internships: List[Internship], applieds: List[AppliedInternship]):
    matched_internships = []
    apply = AppliedAggregate(companynames=set(), positions=set(), cities=set(), stipend=0, desc=set(), jd=set(), skills=set(), internshipSkills=set())

    # Process applied internships to fill the AppliedAggregate
    for applied in applieds:
        internship = applied.internshipId
        apply.companynames.add(internship.companyname)
        apply.positions.add(internship.position)
        apply.cities.update(internship.city)
        apply.skills.update(internship.skills)
        apply.internshipSkills.update(internship.internshipSkills)
        apply.desc.update(internship.desc.lower().split())
        apply.jd.update(internship.jd.lower().split())
        apply.stipend += internship.stipend

    # Calculate average stipend
    l = len(applieds)
    apply.stipend = apply.stipend / l if l > 0 else 0

    for internship in internships:
        match_score = 0

        # Process user and apply skills correctly
        user_skills = set(user.skills).union(apply.skills)
        internship_skills = set(internship.skills)
        matching_skills = user_skills.intersection(internship_skills)
        match_score += len(matching_skills) * 4  # Highest priority
                
        matching_applied_internship_skills = set(apply.internshipSkills).intersection(internship_skills)
        match_score += len(matching_applied_internship_skills) * 2

        match_score += len(apply.jd.intersection(internship.jd.lower().split()))
        match_score += len(apply.desc.intersection(internship.desc.lower().split()))

        if internship.position in apply.positions:
            match_score += 6

        if apply.stipend <= internship.stipend:
            match_score += 4

        for city in internship.city:
            if city in apply.cities:
                match_score += 3

        matched_internships.append({"internship": internship, "match_score": match_score})

    # Sort internships by match score
    matched_internships = sorted(matched_internships, key=lambda x: x["match_score"], reverse=True)
    return matched_internships