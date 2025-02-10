type SkillBadgeProps = {
    skill: string;
};

const SkillBadge = ({ skill }: SkillBadgeProps) => {
    return (
        <span className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm">
            {skill}
        </span>
    );
};

export default SkillBadge;
